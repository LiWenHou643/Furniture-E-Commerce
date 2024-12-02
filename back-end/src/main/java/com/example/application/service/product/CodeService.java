package com.example.application.service.product;

import com.example.application.dto.request.CodeCheckRequest;
import com.example.application.dto.response.CodeCheckResponse;
import com.example.application.entity.Code;
import com.example.application.exception.AppException;
import com.example.application.repository.product.CodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.example.application.exception.ErrorCode.PROMOTION_CODE_INVALID;

@Service
@RequiredArgsConstructor
public class CodeService {
    private final CodeRepository codeRepository;

    public CodeCheckResponse checkCode(CodeCheckRequest request) {
        Code code = codeRepository.findByCode(request.code())
                                  .orElseThrow(() -> new AppException(PROMOTION_CODE_INVALID));
        return CodeCheckResponse.builder()
                                .promoCode(code.getCode())
                                .value(code.getValue())
                                .build();
    }

    public Code checkCode(String code) {
        return codeRepository.findByCode(code)
                             .orElseThrow(() -> new AppException(PROMOTION_CODE_INVALID));
    }
}
