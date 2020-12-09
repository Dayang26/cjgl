package com.snow.cjgl.dao;

import com.snow.cjgl.pojo.Course;

import java.util.List;
import java.util.Map;

/**
 * @author Snow
 * @create 2020-12-08 16:37
 */
public interface CourseMapper {

    List<Course> getCourseAll(Map map);
}
