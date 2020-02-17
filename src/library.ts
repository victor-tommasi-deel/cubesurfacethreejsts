import {
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  DirectionalLight
} from 'three';

const randomInRange = (from: number, to: number): number => {
  const x = Math.random() * (to - from);
  return x + from;
}

const createCube = (w: number, h: number, d: number): Mesh => {
  const geometry = new BoxGeometry(w, h, d);
  const material = new MeshLambertMaterial({ color: Math.random() * 0xffffff });
  const cube = new Mesh(geometry, material);
  cube.position.x = randomInRange(-40, 40);
  cube.position.z = randomInRange(-40, 40);
  return cube;
}

const createCubes = (quantity: number): Array<Mesh> => {
  const cubes = [];
  for (let i = 1; i <= quantity; i++) {
    const w = randomInRange(1, 3);
    const h = randomInRange(1, 3);
    const d = randomInRange(1, 3);
    cubes.push(createCube(w, h, d));
  }
  return cubes;
}

const addToScene = (array: Array<Mesh>, scene: Scene) => {
  Object.entries(array).forEach((entry) => {
    const value = entry[1];
    scene.add(value);
  });
};

interface initialize {
  scene: Scene,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
}

const init = (): initialize => {
  const scene = new Scene();
  scene.background = new Color(0xffffee);


  const camera = new PerspectiveCamera(75,
    window.innerWidth / window.innerHeight,
    1, 1000);
  camera.position.z = 100;
  camera.position.y = 5;
  const light = new DirectionalLight(0xffffff);

  scene.add(light);
  const cubes = createCubes(150);
  addToScene(cubes, scene);

  // create the renderer   
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  return {
    scene,
    camera,
    renderer
  }
}

export { randomInRange, createCube, init };