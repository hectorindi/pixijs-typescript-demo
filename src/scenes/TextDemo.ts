import * as PIXI from 'pixi.js';
import {
    Application,
    Container,
    Sprite,
    Texture,
    TextStyle,
    Text,
} from 'pixi.js';
import { TweenMax, TimelineLite, gsap } from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';
const plugins = [PixiPlugin];
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export class TextDemo extends Container {
    private app: Application;
    private textContainer: Container;
    private strArr: string[] = [
        '[image] [image] this is some [image] random text [image]',
        'this [image] is [image] some random text',
        'this is some [image] random [image] text',
        'this is some [image] random text [image]',
        '[image] this is some [image] random text',
        'this is some [image] random text',
        '[image] this is some [image] random [image] text',
        '[image] this is [image] [image] some [image] random text',
    ];
    private imgArr: Sprite[] = [];
    private intervalId: any;

    constructor(app: Application) {
        super();
        this.app = app;
        this.textContainer = new Container();
        this.addChild(this.textContainer);
        this.intervalId;
        this.textContainer.pivot.set(
            this.textContainer.width / 2,
            this.textContainer.height / 2
        );

        this.textContainer.position.set(
            window.innerWidth / 2 - 300,
            window.innerHeight / 2
        );

        for (let j = 1; j <= 5; j++) {
            let icon = new Sprite(
                app.loader.resources[`assets/icon${j}.png`].texture
            );
            this.imgArr.push(icon);
        }

        this.startShowingText();
    }

    public startShowingText(): void {
        this.clearShowingText();
        this.intervalId = setInterval(() => {
            this.textContainer.removeChildren();
            this.textContainer.addChild(this.makestringwithImage());
        }, 2000);
    }

    public clearShowingText(): void {
        this.textContainer.removeChildren();
        clearInterval(this.intervalId);
    }

    private makestringwithImage(): Container {
        // let str = this.strArr[Math.floor(Math.random() * 7)];
        let str = this.strArr[0];
        let stringArr = str.split('[');
        console.log(stringArr);
        let fullContainer = new Container();
        let fontSize = Math.floor(Math.random() * 35) + 25;
        let lastX = 0;
        const style = new TextStyle({ fill: 'white', fontSize: fontSize });
        let dummyText = new Text('Hi', style);
        stringArr.forEach((elem) => {
            if (elem.includes('image]')) {
                let secondBreakArr = elem.split('image]');
                let imgIndex = Math.floor(Math.random() * 5);
                // let img = this.imgArr[imgIndex];
                let img = new Sprite(
                    this.app.loader.resources[
                        `assets/icon${imgIndex + 1}.png`
                    ].texture
                );
                fullContainer.addChild(img);
                img.x = img.x + lastX;
                img.y = img.y - dummyText.height / 2 - 5;
                lastX = lastX + img.width + 10;
                fullContainer.addChild(img);

                let scndStr = secondBreakArr[1].replace(/\s/g, '');

                if (scndStr !== '') {
                    let labelpart = new Text(secondBreakArr[1], style);
                    labelpart.x = labelpart.x + lastX;
                    lastX = lastX + labelpart.width + 10;
                    fullContainer.addChild(labelpart);
                }
            } else if (elem !== '') {
                let labelpart = new Text(elem, style);
                labelpart.x = labelpart.x + lastX;
                lastX = lastX + labelpart.width + 10;
                fullContainer.addChild(labelpart);
            }
        });

        return fullContainer;
    }
}
