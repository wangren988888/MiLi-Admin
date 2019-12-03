import {
	Locale
} from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';
import zhCN from 'vant/lib/locale/lang/zh-CN';
import vantFr from './lang/vant-FR.js';
export function VantLocal(lang) {
	if (lang === "zh-CN") {
		Locale.use('zh', zhCN);
	} else if (lang === "en-US") {
		Locale.use('en', enUS);
	} else if (lang === 'fr-FR') {
		Locale.use('fr', vantFr);
	}
}
