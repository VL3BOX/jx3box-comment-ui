import { $cms } from "@jx3box/jx3box-common/js/https";
import User from "@jx3box/jx3box-common/js/user";
const KEY = "commentDefaultOrderMode";

async function getOrderMode() {
    if (User.isLogin()) {
        return $cms()
            .get(`/api/cms/user/my/meta`, {
                params: {
                    key: KEY
                }
            })
            .then(res => {
                return res.data.data;
            });
    } else {
        return new Promise(resolve => {
            resolve(localStorage.getItem(KEY));
        });
    }
}

async function setOrderMode(val) {
    if (User.isLogin()) {
        return $cms()
            .post(
                `/api/cms/user/my/meta`,
                {
                    val: val
                },
                {
                    params: {
                        key: KEY
                    }
                }
            )
            .then(res => {
                return res.data.data;
            });
    } else {
        return new Promise(resolve => {
            resolve(localStorage.setItem(KEY, val));
        });
    }
}

export { getOrderMode, setOrderMode };
