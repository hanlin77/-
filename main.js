
let fighter = document.getElementById("fighter");
fighter.style.left = (document.documentElement.clientWidth/2 - 25) + "px";


function fighterMove(t, speed) {
    let startDiv = document.getElementById("startDiv");
    startDiv.style.display = "none";

    let fighterLeft = parseInt(window.getComputedStyle(fighter, null).getPropertyValue("left"));
    let fighterTop = parseInt(window.getComputedStyle(fighter, null).getPropertyValue("top"));
    let enemiesDiv = document.getElementById("enemiesDiv");

    var score = 0;

    //敌人运动

    function enemyMove() {

        //每秒生成一个敌人
        let createEnemy = setInterval(() => {
            let enemy = document.createElement("div");
            enemiesDiv.appendChild(enemy);
            enemy.className = "enemy";
            let left = Math.round(Math.random() * (document.documentElement.clientWidth - 40));
            enemy.style.left = left + "px";
            let enemyDown = setInterval(() => {
                let top = parseInt(window.getComputedStyle(enemy, null).getPropertyValue("top"));
                top += speed;
                enemy.style.top = top + "px";

                //敌人飞出屏幕边界之后移除
                if (top > document.documentElement.clientHeight) {
                    clearInterval(enemyDown);
                    enemiesDiv.removeChild(enemy);
                }

                //敌人碰到飞机，游戏结束
                if (left > (fighterLeft - 40) && left < (fighterLeft + 50) && top > (fighterTop - 40) && top < (fighterTop + 50)) {

                    let endDiv = document.getElementById("endDiv");
                    let scoreSpan = document.getElementById("score");
                    fighter.style.background = "orange";
                    endDiv.style.display = "block";
                    scoreSpan.innerHTML = score;
                    clearInterval(enemyDown);
                    clearInterval(createEnemy);
                    fighter.onmousedown = null;
                    fighter.ontouchstart = null;
                    document.onmousemove = null;
                    document.ontouchmove = null;
                }
            }, 30)
        }, t)
    }

    function pcShoot() {
        fighter.onmousedown = (event) => {

            let originalX = parseInt(window.getComputedStyle(fighter, null).getPropertyValue("left"));
            let originalY = parseInt(window.getComputedStyle(fighter, null).getPropertyValue("top"));

            let disX = event.clientX - originalX;
            let disY = event.clientY - originalY;

            //发射子弹
            let createBullet = setInterval(() => {
                let bulletsDiv = document.getElementById("bulletsDiv");
                let bullet = document.createElement("div");
                let bulletLeft = parseInt(window.getComputedStyle(fighter, null).getPropertyValue("left")) + 21;
                let bulletTop = parseInt(window.getComputedStyle(fighter, null).getPropertyValue("top"));
                bulletsDiv.appendChild(bullet);
                bullet.className = "bullet";
                bullet.style.left = bulletLeft + "px";
                bullet.style.top = bulletTop + "px";

                
                //子弹向上运动
                let bulletUp = setInterval(() => {
                    let top = parseInt(window.getComputedStyle(bullet, null).getPropertyValue("top"));
                    top -= 10;
                    bullet.style.top = top + "px";

                    //子弹射出屏幕
                    if (top < -10) {
                        clearInterval(bulletUp);
                        bulletsDiv.removeChild(bullet);
                    }
                    //遍历当前敌人位置，如果和子弹重合，敌人被移除
                    else {
                        let enemies = enemiesDiv.getElementsByClassName("enemy");
                        for (let i = 0; i < enemies.length; i++) {
                            let enemiesLeft = parseInt(window.getComputedStyle(enemies[i], null).getPropertyValue("left"));
                            let enemiesTop = parseInt(window.getComputedStyle(enemies[i], null).getPropertyValue("top"));
                            if (bulletLeft > enemiesLeft - 8 && bulletLeft < enemiesLeft + 48 && top < enemiesTop + 40 && top > enemiesTop + 25) {
                                enemies[i].style.background = "yellow";
                                bulletsDiv.removeChild(bullet);
                                let diedEnemy = enemies[i];
                                setTimeout(() => {
                                    enemiesDiv.removeChild(diedEnemy);
                                    score++;
                                }, 50)
                            }
                        }
                    }

                }, 30)

            }, 200)

            //飞机跟随鼠标移动
            document.onmousemove = (event) => {
                let left = event.clientX - disX;
                let top = event.clientY - disY;

                if (left < 0) {
                    left = 0;
                }
                if (left > (document.documentElement.clientWidth - 50)) {
                    left = document.documentElement.clientWidth - 50;
                }
                if (top < 0) {
                    top = 0;
                }
                if (top > (document.documentElement.clientHeight - 50)) {
                    top = document.documentElement.clientHeight - 50;
                }

                fighter.style.left = left + "px";
                fighter.style.top = top + "px";

                fighterLeft = left;
                fighterTop = top;

            }

            document.onmouseup = () => {
                document.onmousemove = null;
                clearInterval(createBullet);
            }
        }
    }

    function mobileShoot() {

        fighter.ontouchstart = (event) => {

            let originalX = parseInt(window.getComputedStyle(fighter, null).getPropertyValue("left"));
            let originalY = parseInt(window.getComputedStyle(fighter, null).getPropertyValue("top"));
            let touch = event.touches[0];

            let disX = touch.pageX - originalX;
            let disY = touch.pageY - originalY;

            //发射子弹
            let createBullet = setInterval(() => {
                let bulletsDiv = document.getElementById("bulletsDiv");
                let bullet = document.createElement("div");
                let bulletLeft = parseInt(window.getComputedStyle(fighter, null).getPropertyValue("left")) + 21;
                let bulletTop = parseInt(window.getComputedStyle(fighter, null).getPropertyValue("top"));
                bulletsDiv.appendChild(bullet);
                bullet.className = "bullet";
                bullet.style.left = bulletLeft + "px";
                bullet.style.top = bulletTop + "px";

                
                //子弹向上运动
                let bulletUp = setInterval(() => {
                    let top = parseInt(window.getComputedStyle(bullet, null).getPropertyValue("top"));
                    top -= 10;
                    bullet.style.top = top + "px";

                    //子弹射出屏幕
                    if (top < -10) {
                        clearInterval(bulletUp);
                        bulletsDiv.removeChild(bullet);
                    }
                    //遍历当前敌人位置，如果和子弹重合，产生射击效果
                    else {
                        let enemies = enemiesDiv.getElementsByClassName("enemy");
                        for (let i = 0; i < enemies.length; i++) {
                            let enemiesLeft = parseInt(window.getComputedStyle(enemies[i], null).getPropertyValue("left"));
                            let enemiesTop = parseInt(window.getComputedStyle(enemies[i], null).getPropertyValue("top"));
                            if (bulletLeft > enemiesLeft - 8 && bulletLeft < enemiesLeft + 48 && top < enemiesTop + 40 && top > enemiesTop + 25) {
                                enemies[i].style.background = "yellow";
                                bulletsDiv.removeChild(bullet);
                                let diedEnemy = enemies[i];
                                setTimeout(() => {
                                    enemiesDiv.removeChild(diedEnemy);
                                    score++;
                                }, 50)
                            }
                        }
                    }
                }, 30)
            }, 200)

            //飞机跟随手势移动
            document.ontouchmove = (event) => {
                touch = event.touches[0];
                let left = touch.pageX - disX;
                let top = touch.pageY - disY;

                if (left < 0) {
                    left = 0;
                }
                if (left > (document.documentElement.clientWidth - 50)) {
                    left = document.documentElement.clientWidth - 50;
                }
                if (top < 0) {
                    top = 0;
                }
                if (top > (document.documentElement.clientHeight - 50)) {
                    top = document.documentElement.clientHeight - 50;
                }

                fighter.style.left = left + "px";
                fighter.style.top = top + "px";

                fighterLeft = left;
                fighterTop = top;

            }

            document.ontouchend = () => {
                document.ontouchmove = null;
                clearInterval(createBullet);
            }
        }
    }

    enemyMove();

    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        mobileShoot();
    }
    else {
        pcShoot();
    }

}


