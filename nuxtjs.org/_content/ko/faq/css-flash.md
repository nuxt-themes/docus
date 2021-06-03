---
title: CSS Flash
description: 왜 CSS Flash가 보일까?
category: development
position: 102
---

# 왜 CSS Flash가 보일까?

![cssflash](/flash_css.gif)

이게 보이는 것은 Webpack 을 통해 핫 리로딩을 하는 **개발모드** 에서, 빌드한 JavaScript 안에 CSS 가 작성되어 있기 때문입니다.

그러니 걱정마세요. 프로덕션 모드에서는 CSS 는 분리되어서 head 에 위치하기 때문에 , 이런 "flash" 현상은 보이지 않습니다.
