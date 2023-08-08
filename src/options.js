import { $cms } from "@jx3box/jx3box-common/js/https";
import User from "@jx3box/jx3box-common/js/user";
const KEY = "cmt_order";

async function getOrderMode() {
    if (User.isLogin()) {
        return $cms({ mute: true })
            .get(`/api/cms/user/conf`, {
                params: {
                    key: KEY
                }
            })
            .then(res => {
                return res.data.data;
            });
    } else {
        return new Promise(resolve => {
            const key = localStorage.getItem(KEY) || 'DESC'
            resolve(key);
        });
    }
}

async function setOrderMode(val) {
    if (User.isLogin()) {
        return $cms()
            .put(
                `/api/cms/user/conf`,
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
