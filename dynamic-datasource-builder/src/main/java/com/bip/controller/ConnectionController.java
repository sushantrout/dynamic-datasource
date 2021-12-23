package com.bip.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import com.bip.dao.ConnectionDao;
import com.bip.entity.Connection;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import com.bip.model.ConnectionModel;

@RestController
@RequestMapping(value = "api/connection")
@Slf4j
public class ConnectionController {

	@Autowired
	private ConnectionDao connectionDao;
    Logger logger = LoggerFactory.getLogger(ConnectionController.class);

	@GetMapping
	public List<Connection> getAllConnectionDetails() {
		return connectionDao.findAll();
	}

	@GetMapping("/{dataSourceName}")
	public Connection getConnectionDetailByName(@PathVariable("dataSourceName") String dataSourceName) {
		return connectionDao.findByDataSourceName(dataSourceName);
	}

    /* JDBC Template Implementation Start */

	@PutMapping
	public List<Map<String, Object>> testConnection(@RequestBody ConnectionModel model) throws SQLException {
		String url = model.getUrl();
		String username = model.getUsername();
		String password = model.getPassword();
		List<String> driverClassNameAndQUery = driverClassNameAndQuery(model.getType());
		String driveClassName = driverClassNameAndQUery.get(0);

		DataSource build = getDataSource(url, username, password, driveClassName);
		boolean isConnected = build.getConnection().isValid(100);
		if(isConnected) {
			connectionDao.save(model._toConvertConnectionEntity());
		}
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

    @PostMapping("/{name}")
    private List<Map<String, Object>> getTableInformation(@PathVariable("name") String name, @RequestBody ConnectionModel model) throws SQLException {
        logger.info("table info called");
		String sqlQuery = "SELECT column_name FROM information_schema.columns WHERE table_name = '"+name+"'";

        String url = model.getUrl();
        String username = model.getUsername();
        String password = model.getPassword();
        List<String> driverClassNameAndQUery = driverClassNameAndQuery(model.getType());
        String driveClassName = driverClassNameAndQUery.get(0);

        DataSource build = getDataSource(url, username, password, driveClassName);
        JdbcTemplate jdbcTemplate = new JdbcTemplate(build);
		final List<Map<String, Object>> queryForList = jdbcTemplate.queryForList(sqlQuery);
		build.getConnection().close();
        return queryForList;
    }

	@PostMapping("/{oldcolumnname}/{columnname}/{tablename}")
	private void updateColumnName(@PathVariable("oldcolumnname") String oldcolumnname, @PathVariable("columnname") String columnname,
								  @PathVariable("tablename") String tablename,
								  @RequestBody ConnectionModel model) throws SQLException {
		logger.info("table info called");
		String sqlQuery = "ALTER TABLE "+tablename+" RENAME COLUMN "+oldcolumnname+" TO "+columnname+"";

		String url = model.getUrl();
		String username = model.getUsername();
		String password = model.getPassword();
		List<String> driverClassNameAndQUery = driverClassNameAndQuery(model.getType());
		String driveClassName = driverClassNameAndQUery.get(0);

		DataSource build = getDataSource(url, username, password, driveClassName);
		JdbcTemplate jdbcTemplate = new JdbcTemplate(build);
		jdbcTemplate.execute(sqlQuery);

		build.getConnection().close();
	}

    /*JDBC Template Implementation end*/

    /* Hibernate Template Implementation start */

   /* @PostMapping
    public Object testConnection(@RequestBody ConnectionModel model) throws SQLException {
        String url = model.getUrl();
        String username = model.getUsername();
        String password = model.getPassword();
        List<String> driverClassNameAndQUery = driverClassNameAndQuery(model.getType());
        String driveClassName = driverClassNameAndQUery.get(0);

        DataSource build = getDataSource(url, username, password, driveClassName);
        Object queryForList = executeQuery(driverClassNameAndQUery, build);
        return queryForList;
    }

    @Transactional
    Object executeQuery(List<String> driverClassNameAndQUery, DataSource build)
            throws SQLException {
        Configuration configuration = new Configuration()
                .configure();
        SessionFactory sf = configuration
                .buildSessionFactory(
                        new StandardServiceRegistryBuilder()
                                .applySettings(configuration.getProperties())
                                .applySetting(Environment.DATASOURCE, build)
                                .build());
        Session session = sf.openSession();
        Transaction txn = session.beginTransaction();
        HibernateTemplate hibernateTemplate = new HibernateTemplate(sf);
        String sql = driverClassNameAndQUery.get(1);

        Object execute = hibernateTemplate.execute((HibernateCallback<Object>) session1 -> session1.createQuery(sql).executeUpdate());
        txn.commit();
        logger.info((String) execute);

        build.getConnection().close();
        return execute;
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
        String postgresQuery = "SELECT table_name FROM sysibm.systables";
        //String critarea = " WHERE table_schema = 'public'";

        String drivename = "org.postgresql.Driver";
        ArrayList<String> arrayList = new ArrayList<>();
        arrayList.add(drivename);
        arrayList.add(postgresQuery);
        return arrayList;
    }*/

    /* Hibernate Template Implementation end */
}
