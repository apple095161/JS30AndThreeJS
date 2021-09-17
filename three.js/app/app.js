import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, TextureLoader, DoubleSide, SphereGeometry, MeshStandardMaterial, MathUtils } from '../node_modules/three/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

const scene = new Scene(); //場景
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //相機
const renderer = new WebGLRenderer({ antialias: true }); //渲染器
const Textures = new TextureLoader(); //創建圖形載入功能
const boxtexture = Textures.load('../assets/p1.jpg'); //設定幾何圖形自定義圖片
const geometry = new BoxGeometry(1, 1, 1); //創建幾何圖形 並設置大小 X Y Z

const Skygeometry = new BoxGeometry(100, 100, 100); //背景幾何圖
const material = new MeshBasicMaterial({ map: boxtexture, side: DoubleSide }); //圖形參數 map 可設定顏色color:'red',DoubleSide = 雙層圖片內外都有圖
// const Skymaterial = [ //設定背景的天空自定義圖片
//     new MeshBasicMaterial({ map: Textures.load('../assets/rt.png'), side: DoubleSide }), //左邊盒子
//     new MeshBasicMaterial({ map: Textures.load('../assets/lf.png'), side: DoubleSide }), //右邊盒子
//     new MeshBasicMaterial({ map: Textures.load('../assets/up.png'), side: DoubleSide }), //上面盒子
//     new MeshBasicMaterial({ map: Textures.load('../assets/dn.png'), side: DoubleSide }), //下面盒子
//     new MeshBasicMaterial({ map: Textures.load('../assets/bk.png'), side: DoubleSide }), //後面盒子
//     new MeshBasicMaterial({ map: Textures.load('../assets/ft.png'), side: DoubleSide }), //前面盒子
// ];
const controls = new OrbitControls(camera, renderer.domElement); // 圖形控制器 縮放 左右
const cube = new Mesh(geometry, material); //圖形實例化 設定
// const Skycube = new Mesh(Skygeometry, Skymaterial);//圖形實例化 設定
renderer.setSize(window.innerWidth, window.innerHeight); // 畫布的大小 設定
document.body.appendChild(renderer.domElement); //畫布直接嵌入在body在body
camera.position.set(0, 0, 5); //相機位置

scene.add(cube); //增加到場景
// scene.add(Skycube); //增加到場景

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight); //縮放重新設置畫布為瀏覽器寬高
    camera.aspect = window.innerWidth / window.innerHeight;  //畫面縮放 相機左右比例
    camera.updateProjectionMatrix(); //相機更新透視比例
})

function addStar () {
    const geometry = new SphereGeometry(0.25, 24, 24); //星星圖形
    const material = new MeshStandardMaterial({ color: '#fff' });
    const star = new Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => {
        MathUtils.randFloatSpread(100);
    })
    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar)

function animate () {
    requestAnimationFrame(animate); //動畫
    cube.rotation.x += 0.01; //圖形轉動 X 上下 Y 左右 Z角度
    cube.rotation.y += 0.01;//圖形轉動 X 上下 Y 左右 Z角度
    cube.rotation.z += 0.01; //
    // Skycube.rotation.y += 0.001; //背景轉動 X 上下 Y 左右 Z角度
    // Skycube.rotation.z += 0.01; //背景轉動 X 上下 Y 左右 Z角度
    controls.update(); //控制器觸發
    renderer.render(scene, camera); //渲染場景在畫面上
}
animate();