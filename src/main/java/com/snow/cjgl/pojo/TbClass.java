package com.snow.cjgl.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Snow
 * @create 2020-12-08 10:36
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TbClass {
    private Integer id;
    private String name;
    private String manager;

}
