import { findDir } from "@vue/compiler-core"

export type Dot = {
  x: number
  y: number
  color: string
}

export const useDots = () => {
  const col = 64
  const row = 64
  const dots = ref<Dot[]>([])
  onMounted(() => {
    myContext.value = myCanvas.value.getContext('2d')
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        dots.value.push({
          x: j,
          y: i,
          color: '',
        })
      }
    }
  })
  const myCanvas = ref(null)
  const myContext = ref(null)
  const canvasWidth = 256
  const draw = (dot: Dot) => {
    const x = dot.x * (canvasWidth / col)
    const y = dot.y * (canvasWidth / row)
    myContext.value.clearRect(x, y, canvasWidth / col, canvasWidth / row)
    myContext.value.fillStyle = dot.color
    myContext.value.fillRect(x, y, canvasWidth / col, canvasWidth / row)
  }
  const currentColor = ref<string>('#ffffff')
  const fillFlug = ref<boolean>(false)
  const canvasMousedownFlug = ref<boolean>(false)
  const changeColor = (dot: Dot) => {
    if (fillFlug.value == true) {
      fill(dot)
      return
    }
    dot.color = currentColor.value
    draw(dot)
    return
  }
  const imageUrl = ref<string>('')
  const storeImage = () => {
    imageUrl.value = myCanvas.value.toDataURL()
  }
  const onMousedown = () => {
    canvasMousedownFlug.value = true
    return
  }
  const onMouseup = () => {
    canvasMousedownFlug.value = false
    return
  }
  const onMousemove = (dot: Dot) => {
    if (canvasMousedownFlug.value && !fillFlug.value) {
      dot.color = currentColor.value
      draw(dot)
    }
    return
  }
  const onMouseleave = () => {
    canvasMousedownFlug.value = false
    return
  }
  const fill = (dot: Dot) => {
    const fillColor = ref(dot.color)
    const fillDown = (dot) => {
      const fillRowDots = dots.value.filter((index) => index.x === dot.x)
      const nextRowDot = ref(fillRowDots[dot.y + 1])
      if (dot.y === row - 1 || fillColor.value !== nextRowDot.value.color) {
        return
      }
      if (fillColor.value === nextRowDot.value.color) {
        nextRowDot.value.color = currentColor.value
        draw(nextRowDot.value)
        dot = nextRowDot.value
      } else {
        return
      }
      fillDown(dot)
      fillUp(dot)
      fillRight(dot)
      fillLeft(dot)
    }
    const fillUp = (dot) => {
      const fillRowDots = dots.value.filter((index) => index.x === dot.x)
      const nextRowDot = ref(fillRowDots[dot.y - 1])
      if (dot.y === 0 || fillColor.value !== nextRowDot.value.color) {
        return
      }
      if (fillColor.value === nextRowDot.value.color) {
        nextRowDot.value.color = currentColor.value
        draw(nextRowDot.value)
        dot = nextRowDot.value
      } else {
        return
      }
      fillDown(dot)
      fillUp(dot)
      fillRight(dot)
      fillLeft(dot)
    }
    const fillRight = (dot) => {
      const fillColDots = dots.value.filter((index) => index.y === dot.y)
      const nextColDot = ref(fillColDots[dot.x + 1])
      if (dot.x === col - 1 || fillColor.value !== nextColDot.value.color) {
        return
      }
      if (fillColor.value === nextColDot.value.color) {
        nextColDot.value.color = currentColor.value
        draw(nextColDot.value)
        dot = nextColDot.value
      } else {
        return
      }
      fillDown(dot)
      fillUp(dot)
      fillRight(dot)
      fillLeft(dot)
    }
    const fillLeft = (dot) => {
      const fillColDots = dots.value.filter((index) => index.y === dot.y)
      const nextColDot = ref(fillColDots[dot.x - 1])
      if (dot.x === 0 || fillColor.value !== nextColDot.value.color) {
        return
      }
      if (fillColor.value === nextColDot.value.color) {
        nextColDot.value.color = currentColor.value
        draw(nextColDot.value)
        dot = nextColDot.value
      } else {
        return
      }
      fillDown(dot)
      fillUp(dot)
      fillRight(dot)
      fillLeft(dot)
    }
    fillDown(dot)
    fillUp(dot)
    fillRight(dot)
    fillLeft(dot)
  }
  const gridFlug = ref<boolean>(true)
  return {
    col,
    row,
    dots,
    currentColor,
    changeColor,
    myCanvas,
    myContext,
    imageUrl,
    storeImage,
    onMousedown,
    onMouseup,
    onMousemove,
    onMouseleave,
    fillFlug,
    gridFlug,
  }
}
