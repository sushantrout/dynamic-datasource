package com.bip.dao;

import com.bip.entity.ColumMapper;
import com.bip.entity.Connection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColumnMapperDao extends CrudRepository<ColumMapper, Long > {
    @Query("from ColumMapper c where c.connection=:connectionId AND c.tableName=:tablename")
    public List<ColumMapper> findByConnectionAndTableName(Connection connectionId, String tablename);

}
