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
public class Student {
    private Integer id;
    private TbClass tbClass;
    private String stuNo;
    private String fileName;
    private String uuid;
}
