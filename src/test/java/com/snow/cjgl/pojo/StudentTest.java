package com.snow.cjgl.pojo;

import com.snow.cjgl.dao.StudentMapper;
import com.snow.cjgl.utils.MybatisUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;

/**
 * @author Snow
 * @create 2020-12-08 19:00
 */
public class StudentTest {

    @Test
    public void getStudentAll() {
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        StudentMapper mapper = sqlSession.getMapper(StudentMapper.class);

        HashMap map = new HashMap();
//        map.put("id","2");

        List<Student> studentAll = mapper.getStudentAll(map);

        for (Student student : studentAll) {
            System.out.println(student);
        }
        sqlSession.close();
    }
}
