package com.snow.cjgl.dao;

import com.snow.cjgl.pojo.Student;

import java.util.List;
import java.util.Map;

/**
 * @author Snow
 * @create 2020-12-08 16:36
 */
public interface StudentMapper {


    /**
     * 13123
     * @param map
     * @return
     */
    List<Student> getStudentAll(Map map);
}
