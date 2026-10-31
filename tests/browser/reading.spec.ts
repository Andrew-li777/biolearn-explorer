import {test,expect} from '@playwright/test';
test('shareable reading state, history, fallbacks and version',async({page})=>{
 await page.goto('/#/proteomics?stage=results&comparison=Ubi1_vs_Ctrl');
 await expect(page.getByLabel('选择方法或组别')).toHaveValue('Ubi1_vs_Ctrl');
 await expect(page.locator('.figure-panel')).toHaveCount(0);
 await page.reload();await expect(page.getByLabel('选择方法或组别')).toHaveValue('Ubi1_vs_Ctrl');
 await page.getByLabel('选择方法或组别').selectOption('Ubi4_vs_Ctrl');await expect(page.locator('.figure-panel')).toHaveCount(2);
 await page.goBack();await expect(page.getByLabel('选择方法或组别')).toHaveValue('Ubi1_vs_Ctrl');
 await page.goForward();await expect(page.getByLabel('选择方法或组别')).toHaveValue('Ubi4_vs_Ctrl');
 await page.goto('/#/evidence?case=PIK3C2B&mode=forward');await expect(page.locator('.evidence-list h3').first()).toHaveText('方法与输入');
 await expect(page.getByText('32208000')).toBeVisible();await page.getByRole('link',{name:'返回对应比较的敏感性分析 →'}).click();
 await expect(page.getByLabel('选择方法或组别')).toHaveValue('Ubi1_vs_Ctrl');await expect(page.getByRole('heading',{name:'敏感性分析',exact:true})).toBeVisible();
 await page.goto('/#/bulk?stage=invalid&method=unknown');await expect(page.getByRole('heading',{name:'样本与设计',exact:true})).toBeVisible();
 await page.locator('.version-info summary').click();await expect(page.getByText('网站构建：',{exact:false})).toBeVisible();
 await page.goto('/#/evidence?case=invalid&mode=invalid');await expect(page.locator('#case-heading')).toContainText('RPS27A');await page.getByLabel('检索证据').fill('no-such-case');await expect(page.getByText('没有匹配的公开摘要',{exact:false})).toBeVisible();
});
