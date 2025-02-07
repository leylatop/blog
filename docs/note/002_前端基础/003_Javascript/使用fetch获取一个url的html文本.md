```js
const fetchGet = async (url: string) => fetch(url, { method: 'GET', cache: 'force-cache', mode: 'cors', credentials: 'same-origin' })

const fetchText = async(url) => {
	const text = await (await fetchGet(url)).text()
	return text
}

const text = await fetchText('xxxxx')
```

- 核心 `.text()`


#javascript 