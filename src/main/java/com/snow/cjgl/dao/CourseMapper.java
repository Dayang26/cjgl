package com.snow.cjgl.dao;

import com.snow.cjgl.pojo.Course;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author Snow
 * @create 2020-12-08 16:37
 */
public interface CourseMapper {

    /**
     * 动态sql查询
     *
     * @param map
     * @return
     */
    List<Course> getCourseAll(Map map);

    /**
     *
     *fasdf
     * @param id
     * @return
     */
    Course getCourseById(@Param("id") int id);


    /**
     * 新增课程
     * 课程名称和课时可以为空！！！！
     *
     * @param map
     * @return
     */
    int addCourse(Map map);

    /**
     * 通过id修改
     * 如果有那么就修改name
     * 如果课时就修改课时
     * 如果两者都有全修改。
     *
     * @param map
     * @return
     */
    int updateCourse(Map map);

    /**
     * 通过id删除
     *
     * @param map
     * @return
     */
    int deleteCourse(Map map);
}
