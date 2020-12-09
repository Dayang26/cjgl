package com.snow.cjgl.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Snow
 * @create 2020-12-08 10:40
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SysRole {
    private Integer id;
    private String name;
    private String code;
    @JsonIgnore
    private List<SysUser> users = new ArrayList<SysUser>();

}
