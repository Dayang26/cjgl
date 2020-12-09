package com.snow.cjgl.web.webControl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

/**
 * @author Snow
 * @create 2020-12-09 10:29
 */


@Controller
@RequestMapping("/template")
public class TestControl {
    /**
     * 返回html模板.
     */
    @RequestMapping("/helloHtml")
    public String helloHtml(Map<String,Object> map){
        map.put("hello","from TemplateController.helloHtml");
        return "hello";
    }
}
