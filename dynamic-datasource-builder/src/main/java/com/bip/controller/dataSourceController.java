package com.bip.controller;

import com.bip.dao.ConnectionDao;
import com.bip.entity.Connection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/datasource")
public class dataSourceController {
    @Autowired
    private ConnectionDao connectionDao;

    @GetMapping
    public Connection getConnectionDetailByName(String dataSourceName) {
        return connectionDao.findByDataSourceName(dataSourceName);
    }
}
