package com.bip.entity;

import com.bip.model.ConnectionModel;
import lombok.Data;

import javax.persistence.*;
import java.util.Map;

@Data
@Entity
@Table(name = "column_mappr_tbl")
public class ColumMapper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "model_data_source_name")
    private Connection connection;

    @Column
    private String tableName;

    @Column
    private Map<String, String> mapperDetails;
}
