import * as React from 'react';
import { WebGLRenderer, Scene, PerspectiveCamera } from 'three';
import { init } from './library';
import './App.css';

interface Props { };

interface State {
  renderer: WebGLRenderer | null | undefined,
  scene: Scene | null | undefined,
  camera: PerspectiveCamera | null | undefined
}

export default class App extends React.Component<Props, State> {
  state: State = {
    renderer: null,
    scene: null,
    camera: null
  }

  componentDidMount = () => {
    const start = init();
    const { renderer, scene, camera } = start;
    this.setState({
      renderer,
      scene,
      camera
    });
    this.mainLoop();
    document.body.appendChild(renderer.domElement);
    document.addEventListener('keydown', this.onKeyDown, false);
  };

  onKeyDown = (e: any) => {
    const { camera } = this.state;
    if (camera && e) {
      switch (e.keyCode) {
        case 37:
          camera.position.x -= 0.2;
          break;
        case 39:
          camera.position.x += 0.2;
          break;
        case 38:
          camera.position.y += 0.2;
          break;
        case 40:
          camera.position.y -= 0.2;
          break;
        default:
          break;
      }
    }
  }

  mainLoop = () => {
    const { scene, camera, renderer } = this.state;
    if (camera && renderer && scene) {
      camera.position.z -= 0.1;

      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  render() {
    return (
      <div className="App" />
    );
  }
}
