---
title: CSS Flash
description: Pourquoi un flash CSS apparait avec NuxtJS ?
menu: Why a CSS flash appears
category: development
position: 202
---

![cssflash](/flash_css.gif)

C'est parce qu'en **mode développement** le CSS se trouve dans le JavaScript afin de permettre le rechargement à chaud via webpack. Ce flash est appelé [FOUC](https://fr.wikipedia.org/wiki/FOUC).

Ne vous inquiétez pas, en **mode production** le CSS est séparé et placé dans l'entête afin que le phénomène de FOUC n'apparaisse plus.
