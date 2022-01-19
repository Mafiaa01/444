package ru.kata.spring.boot_security.demo.configs;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final SuccessUserHandler successUserHandler;

    private final CustomAuthenticationProvider authProvider;

    public WebSecurityConfig(SuccessUserHandler successUserHandler, CustomAuthenticationProvider authProvider) {
        this.successUserHandler = successUserHandler;
        this.authProvider = authProvider;
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(authProvider);
        return authenticationManagerBuilder.build();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests()
                .antMatchers("/user/**").hasAnyRole("USER", "ADMIN") // разрешаем входить на /user пользователям с ролью User
                .antMatchers("/admin/**").hasRole("ADMIN") // разрешаем входить на /user пользователям с ролью User
                .antMatchers("/login/**").permitAll()
                .antMatchers("/").permitAll()// доступность всем
                .and().formLogin()  // Spring сам подставит свою логин форму
                .successHandler(successUserHandler); // подключаем наш SuccessHandler для перенеправления по ролям
    }

    @Bean
    public static PasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}