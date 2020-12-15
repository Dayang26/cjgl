package com.snow.cjgl.pojo;

import com.snow.cjgl.dao.CourseMapper;
import com.snow.cjgl.utils.MybatisUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;

/**
 * @author Snow
 * @create 2020-12-09 16:02
 */
public class CourseTest {

    @Test
    public void getCourseAll() {
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        CourseMapper mapper = sqlSession.getMapper(CourseMapper.class);
        HashMap map = new HashMap();
//        map.put("name","语文");
//        map.put("id","1");
        List<Course> courseAll = mapper.getCourseAll(map);
        for (Course course : courseAll) {
            System.out.println(course);
        }

        sqlSession.close();
    }

    @Test
    public void addCourse() {
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        CourseMapper mapper = sqlSession.getMapper(CourseMapper.class);
        HashMap map = new HashMap();
        map.put("name", "css");
        map.put("classHour", "111");
        int i = mapper.addCourse(map);
        System.out.println(i);
        sqlSession.close();
    }

    @Test
    public void updateCourse() {
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        CourseMapper mapper = sqlSession.getMapper(CourseMapper.class);
        HashMap map = new HashMap();
        map.put("id", "10");
        map.put("name", "pppd");
        map.put("classHour", "121");
        int i = mapper.updateCourse(map);
        System.out.println(i);
        sqlSession.close();
    }

    @Test
    public void deleteCourse() {
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        CourseMapper mapper = sqlSession.getMapper(CourseMapper.class);
        HashMap map = new HashMap();
        map.put("id", "10");
        int i = mapper.deleteCourse(map);
        System.out.println(i);
        sqlSession.close();
    }

    @Test
    public void getCourseById() {
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        CourseMapper mapper = sqlSession.getMapper(CourseMapper.class);
        Course courseById = mapper.getCourseById(1);
        System.out.println("courseById"+"="+courseById);
        sqlSession.close();

        SqlSession sqlSession1 = MybatisUtils.getSqlSession();
        CourseMapper mapper1 = sqlSession1.getMapper(CourseMapper.class);
        Course courseById1 = mapper1.getCourseById(1);
        System.out.println("courseById1"+"="+courseById1);
        sqlSession.close();

        System.out.println(courseById==courseById1);
        System.out.println(courseById.equals(courseById1));

    }


}
