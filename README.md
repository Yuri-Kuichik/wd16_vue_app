# wd15_vue_app

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```



# Процесс выполнения домашки

## Клонировать проект
```sh
git clone (url from github)
```

## Перейти в папку проекта
```sh
cd .\wd15_vue_app\
```

## Создать свою ветку (это ваша ветка "main")
```sh
git checkout -b branchName (branchName = your full name)
```

## Пушим созданную ветку
```sh
git push origin branchName
```

## Для выполнения дз, ветвимся (создаем новую ветку) от вашей основной ветки, так называемой main. Она же branchName. Название новой ветки формируем из branchName и -hw1, -hw2, -hw3... (по номеру дз)
```sh
git checkout -b branchName-hw1
```

## Выполняем дз, комитим (описываем комит в name commit)
```sh
git commit -m 'name commit'
```

## Пушим commit. Идем в github и создаем pullRequest в СВОЮ!!! (так называемую) ветку "main" (branchName). Назначаем меня ревьюером
```sh
git push origin branchName-hw1
```

## Как подтягиваем следующее дз в свою ветку "main". Переходим в нее и пулим изменения из настоящей ветки main
```sh
git checkout branchName
git pull origin main
```