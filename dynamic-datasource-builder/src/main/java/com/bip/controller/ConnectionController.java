package com.bip.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bip.model.ConnectionModel;

@RestController
@RequestMapping(value = "api/connection")
public class ConnectionController {

	@GetMapping
	public ConnectionModel empty() {
		return new ConnectionModel();
	}

	@PostMapping
	public List<Map<String, Object>> testConnection(@RequestBody ConnectionModel model) throws SQLException {
		String url = model.getUrl();
		String username = model.getUsername();
		String password = model.getPassword();
		List<String> driverClassNameAndQUery = driverClassNameAndQuery(model.getType());
		String driveClassName = driverClassNameAndQUery.get(0);

		DataSource build = getDataSource(url, username, password, driveClassName);
		List<Map<String, Object>> queryForList = executeQuery(driverClassNameAndQUery, build);
		return queryForList;
	}

	private List<Map<String, Object>> executeQuery(List<String> driverClassNameAndQUery, DataSource build)
			throws SQLException {
		JdbcTemplate jdbcTemplate = new JdbcTemplate(build);
		String sql = driverClassNameAndQUery.get(1);
		List<Map<String, Object>> queryForList = jdbcTemplate.queryForList(sql);
		build.getConnection().close();
		return queryForList;
	}

	private DataSource getDataSource(String url, String username, String password, String driveClassName) {
		DataSourceBuilder builder = DataSourceBuilder.create();
		builder.url(url);
		builder.password(password);
		builder.username(username);
		builder.driverClassName(driveClassName);
		DataSource build = builder.build();
		return build;
	}

	private List<String> driverClassNameAndQuery(String type) {
		String postgresQuery = "SELECT table_name FROM information_schema.tables";
		//String critarea = "";
		String critarea = " WHERE table_schema = 'public';";

		String drivename = "org.postgresql.Driver";
		ArrayList<String> arrayList = new ArrayList<>();
		arrayList.add(drivename);
		arrayList.add(postgresQuery + critarea);
		return arrayList;
	}
}
