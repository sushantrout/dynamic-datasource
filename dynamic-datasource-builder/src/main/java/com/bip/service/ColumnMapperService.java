package com.bip.service;

import com.bip.dao.ColumnMapperDao;
import com.bip.entity.ColumMapper;
import com.bip.entity.Connection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColumnMapperService {
    @Autowired
    private ColumnMapperDao columnMapperDao;
    public ColumMapper save(ColumMapper mapper) {
        columnMapperDao.save(mapper);
        return mapper;
    }

    public ColumMapper findById(Long id) {
        return columnMapperDao.findById(id).get();
    }

    public List<ColumMapper> findByConnectionAndTableName(Connection connectionid, String tablename) {
        return columnMapperDao.findByConnectionAndTableName(connectionid, tablename);
    }
}
