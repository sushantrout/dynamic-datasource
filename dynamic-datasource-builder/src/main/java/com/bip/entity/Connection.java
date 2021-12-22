package com.bip.entity;

import com.bip.dao.ConnectionDao;
import com.bip.model.ConnectionModel;

import javax.persistence.*;

@Entity
@Table(name = "connectiondetails")
public class Connection {
//    @Column(name = "id")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;

    @Id
    @Column
    private String dataSourceName;
    @Column
    private String url;
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private String type;

    public String getDataSourceName() {
        return dataSourceName;
    }

    public void setDataSourceName(String dataSourceName) {
        this.dataSourceName = dataSourceName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public ConnectionModel _toConvertConnectionModel(){
        ConnectionModel model = new ConnectionModel();
        model.setDataSourceName(this.dataSourceName);
        model.setUrl(this.url);
        model.setUsername(this.username);
        model.setPassword(this.password);
        model.setType(this.type);
        return model;
    }
}
