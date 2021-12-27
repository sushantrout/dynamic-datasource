package com.bip.controller;

import com.bip.entity.ColumMapper;
import com.bip.entity.Connection;
import com.bip.service.ColumnMapperService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/api/columnmap")
public class ColumnMapperController {

    @Autowired
    private ColumnMapperService columnMapperService;
    Logger logger = LoggerFactory.getLogger(ConnectionController.class);

    @PostMapping
    private ColumMapper save(@RequestBody ColumMapper mapper) {
        return columnMapperService.save(mapper);
    }

    @GetMapping("/{id}")
    private void findById(@PathVariable("id") Long id) {
        columnMapperService.findById(id);
    }

    @GetMapping("/{connectionname}/{tablename}")
    private List<ColumMapper> findByConnectionAndTableName(@PathVariable("connectionname") String connectionname, @PathVariable("tablename") String tablename) {
        Connection con = new Connection();
        con.setDataSourceName(connectionname);
        logger.info(String.valueOf(columnMapperService.findByConnectionAndTableName(con, tablename)));
        return columnMapperService.findByConnectionAndTableName(con, tablename);
    }
}
