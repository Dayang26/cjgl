package com.snow.cjgl.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Snow
 * @create 2020-12-08 10:40
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Grade {
    private Student student;
    private Course course;
    private Integer grade;
}
