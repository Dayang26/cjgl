package com.snow.cjgl.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Snow
 * @create 2020-12-08 10:41
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SysUser {
    private String username;
    @JsonIgnore
    private String password;
    private String name;
    private List<SysRole> roles = new ArrayList<SysRole>();
}
