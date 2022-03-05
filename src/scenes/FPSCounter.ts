import { TextStyle, Text, Application, Container, Sprite } from 'pixi.js';
import particles = require('pixi-particles');

export class FPSCounter extends Container {
    private app: Application;
    private _fpsText: PIXI.Text;

    constructor(app: Application) {
        super();
        this.app = app;
        this.update = this.update.bind(this);

        const style = new TextStyle({ fill: 'white' });
        this._fpsText = new Text('0', style);
        this.addChild(this._fpsText);
        this._fpsText.position.set(100, 10);
        // Handle update
        this.app.ticker.add(this.update);
    }

    update(_: any, delta: number) {
        let fps = this.app.ticker.FPS;
        this._fpsText.text = 'FPS: ' + parseInt(fps.toString());
    }

    public get fpsText(): Text {
        return this._fpsText;
    }
}
