/*
 Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

import { Base } from "./Base";
import { _decorator  } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PaidEventNTF")
export class PaidEventNTF extends Base {

    valueMicros: number;
    currencyCode: string;
    precision: number;

    adSourceName: string;
    adSourceId: string;
    adSourceInstanceName: string;
    adSourceInstanceId: string;

    mediationGroupName: string;
    mediationABTestName: string;
    mediationABTestVariant: string;
}

@ccclass("BannerPaidEventNTF")
export class BannerPaidEventNTF extends PaidEventNTF {}
@ccclass("InterstitialPaidEventNTF")
export class InterstitialPaidEventNTF extends PaidEventNTF {}
@ccclass("NativePaidEventNTF")
export class NativePaidEventNTF extends PaidEventNTF {}
@ccclass("AppOpenPaidEventNTF")
export class AppOpenPaidEventNTF extends PaidEventNTF {}
@ccclass("RewardedPaidEventNTF")
export class RewardedPaidEventNTF extends PaidEventNTF {}
@ccclass("RewardedInterstitialPaidEventNTF")
export class RewardedInterstitialPaidEventNTF extends PaidEventNTF {}