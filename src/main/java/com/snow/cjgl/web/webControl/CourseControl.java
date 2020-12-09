package com.snow.cjgl.web.webControl;

import com.snow.cjgl.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Snow
 * @create 2020-12-09 15:40
 */


@Controller
@RequestMapping("course")
public class CourseControl {

    @Autowired
    private CourseService courseService;

    @RequestMapping(value = "/manage")
    public void manage() {
    }

}
