package com.snow.cjgl.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author Snow
 * @create 2020-12-08 10:40
 */


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course implements Serializable{
    private Integer id;
    private String name;
    private Integer classHour;

}
