package com.bip.controller;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bip.model.ConnectionModel;

@RestController
@RequestMapping(value = "api/connection")
public class ConnectionController {

	@GetMapping
	public String testConnection() {
		String url = "jdbc:postgresql://localhost:5432/un-admin";
		String username = "postgres";
		String password = "admin";
		
		DataSourceBuilder builder = DataSourceBuilder.create();
		builder.url(url);
		builder.password(password);
		builder.username(username);
		builder.driverClassName("org.postgresql.Driver");
		DataSource build = builder.build();
		JdbcTemplate jdbcTemplate = new JdbcTemplate(build);
		return jdbcTemplate.queryForList("SELECT * FROM public.room\r\n"
				+ "ORDER BY id ASC ").toString();
	}
}
