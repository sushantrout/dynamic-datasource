package com.bip.model;

import com.bip.entity.Connection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ConnectionModel {
	private String dataSourceName;
	private String url;
	private String username;
	private String password;
	private String type;

	public Connection _toConvertConnectionEntity(){
		Connection entity = new Connection();
		entity.setDataSourceName(this.dataSourceName);
		entity.setUrl(this.url);
		entity.setUsername(this.username);
		entity.setPassword(this.password);
		entity.setType((this.type));
		return entity;
	}
}
