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
        List<Course> courseAll = mapper.getCourseAll(map);
        for (Course course : courseAll) {
            System.out.println(course);
        }

        sqlSession.close();
    }
}
