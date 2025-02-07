
```css
@keyframes skeleton-loading {
	0% {
	  background-position: 100% 50%;
	}
	
	to {
	  background-position: 0 50%;
	}
}

.skeleton-loading {
	width: 400px;
	height: 400px;
	background: linear-gradient(130deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
	background-size: 400% 100%;
	animation: skeleton-loading 1.4s ease infinite;
}

```

```html
<div class="skeleton-loading"></div>
```