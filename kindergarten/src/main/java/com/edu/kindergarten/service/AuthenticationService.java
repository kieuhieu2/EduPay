package com.edu.kindergarten.service;

import com.edu.kindergarten.dto.request.AuthenticationRequest;
import com.edu.kindergarten.dto.request.IntrospectRequest;
import com.edu.kindergarten.dto.request.LogoutRequest;
import com.edu.kindergarten.dto.request.RefreshRequest;
import com.edu.kindergarten.dto.response.AuthenticationResponse;
import com.edu.kindergarten.dto.response.IntrospectResponse;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface AuthenticationService {
    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException;
    public AuthenticationResponse authenticate(AuthenticationRequest request);
    public void logout(LogoutRequest request) throws ParseException, JOSEException;
    public AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException;

}
