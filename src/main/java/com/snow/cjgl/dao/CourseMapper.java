package com.snow.cjgl.dao;

import com.snow.cjgl.pojo.Course;

import java.util.List;
import java.util.Map;

/**
 * @author Snow
 * @create 2020-12-08 16:37
 */
public interface CourseMapper {

    /**
     * 动态sql查询
     * @param map
     * @return
     */
    List<Course> getCourseAll(Map map);


    /**
     * 新增课程
     * 课程名称和课时可以为空！！！！
     * @param map
     * @return
     */
    int addCourse(Map map);


    int updateCourse(Map map);
}
