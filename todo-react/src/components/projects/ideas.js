
// set random color
const [color, setColor] = useState("#1abc9c");


let colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#f1c40f", "#e67e22", "#e74c3c", "#f39c12", "#d35400", "#c0392b"
	];


const pickColor = () =>
	{
		let random = Math.floor(Math.random() * 15);
		let newColor = colors[random];
		while(newColor === color)
		{
			random = Math.floor(Math.random() * 15);
			newColor = colors[random];
		}
		setColor(newColor);
		return newColor;
	};