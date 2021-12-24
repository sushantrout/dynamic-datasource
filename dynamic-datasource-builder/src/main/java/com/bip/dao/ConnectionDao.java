package com.bip.dao;

import com.bip.entity.Connection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ConnectionDao extends JpaRepository<Connection, Integer> {

    @Query("from Connection c where c.dataSourceName=:dataSourceName")
    Connection findByDataSourceName(@Param("dataSourceName") String dataSourceName);
}
