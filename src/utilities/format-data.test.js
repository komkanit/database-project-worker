import { bodyToArray, changeInsideTagToArray, changeDataTableToArray, nameToID } from '../utilities';

const mockFetchHtml = () => '<p>testword<p>';

test('bodyToArray should change text to array', async () => {
  const mockArray = await bodyToArray('testurl', mockFetchHtml);
  const ans = mockFetchHtml().split('');
  expect(mockArray).toEqual(ans);
});

test('Should split html tag to array', () => {
  const mockHtml = `
    <tr>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    </tr>
    <tr>
    <td>2</td>
    <td>2</td>
    <td>2</td>
    </tr>
    <tr>
    <td>3</td>
    <td>3</td>
    <td>3</td>
    </tr>
  `;
  const expectedAns = [['1', '1', '1'], ['2', '2', '2'], ['3', '3', '3']];

  changeInsideTagToArray(mockHtml, 'tr', 'td')((err, result) => {
    expect(result).toHaveLength(3);
    expect(result).toEqual(expectedAns);
  });
});

test('Should split real html to expected array', () => {
  const mockhtml = `
    <table width="90%" border="0" cellspacing="2" cellpadding="5">
      <tr>
        <td width="87%">&nbsp;</td>
        <td width="13%"><span class="xl66"><span class="xl68"><span class="xl69"><a href="http://www.oae.go.th/download/price/priceday/Mar60/swine.html"><< ข้อมูลเดือน มี.ค.60</a></span></span></span></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td><span class="xl66"><span class="xl68">หน่วย : บาท/กก.</span></span></td>
      </tr>
    </table>
    <table width="90%" border="0" cellspacing="0" cellpadding="5">
      <tr>
        <td colspan="2" rowspan="4" class="xl110" >ปี 2560</td>
        <td colspan="4" class="xl110" style="border-left: medium none;">สุกรพันธุ์ผสมน้ำหนัก 100 กก.ขึ้นไป&nbsp;</td>
      </tr>
      <tr>
        <td class="xl110">สุดใจฟาร์ม</td>
        <td class="xl110">ฟาร์มคุณอำนาจ    เจริญผล</td>
        <td class="xl110">ศิริปุณย์ฟาร์ม</td>
        <td class="xl110">ฟาร์มโชคชัยการสุกร</td>
      </tr>
      <tr>
        <td class="xl110">ต.มาบแค    อ.เมือง</td>
        <td class="xl110">อ.เมือง&nbsp;</td>
        <td class="xl110">อ.เมือง</td>
        <td class="xl110">อ.โชคชัย</td>
      </tr>
      <tr>
        <td class="xl110">จ.นครปฐม</td>
        <td class="xl110">จ.ราชบุรี</td>
        <td class="xl110">จ.ฉะเชิงเทรา</td>
        <td class="xl110">จ.นครราชสีมา</td>
      </tr>
      <tr class="xl70" style="height: 21.6pt;" height="28">
        <td  class="xl110">เดือน</td>
        <td class="xl110">วันที่</td>
        <td class="xl110">โทร.(081)8564975</td>
        <td class="xl110">โทร (089)2541193</td>
        <td class="xl110">โทร.(038)541429-30</td>
        <td class="xl110"><div align="center">โทร.(044)212442</div></td>
      </tr>
      <tr class="xl65" style="height: 20.45pt;" height="27">
        <td class="xl97">เมษายน</td>
        <td class="xl97">1</td>
        <td width="291" class="xl98"><div align="center">-</div></td>
        <td width="291" class="xl98"><div align="center">-</div></td>
        <td width="291" class="xl98"><div align="center">-</div></td>
        <td width="291" class="xl98"><div align="center">-</div></td>
      </tr>
      <tr class="xl65" style="height: 20.45pt;" height="27">
        <td class="xl97">&nbsp;</td>
        <td class="xl97">2</td>
        <td class="xl98"><div align="center"></div></td>
        <td class="xl98"><div align="center"></div></td>
        <td class="xl98"><div align="center"></div></td>
        <td class="xl98"><div align="center"></div></td>
      </tr>
      <tr class="xl65" style="height: 20.45pt;" height="27">
        <td class="xl97">&nbsp;</td>
        <td class="xl97">3</td>
        <td class="xl98"><div align="center">57.00</div></td>
        <td class="xl98"><div align="center">60.00</div></td>
        <td class="xl98"><div align="center">60.00</div></td>
        <td class="xl98"><div align="center">58.00</div></td>
      </tr>
    </table>
  `;
  const expectedAns = [
    {
      farmName: 'สุดใจฟาร์ม',
      address: 'ต.มาบแค อ.เมือง',
      province: 'นครปฐม',
      tel: '(081)8564975',
      month: 'เมษายน',
      year: '2560',
      data: ['-', '-', 57.00]
    },
    {
      farmName: 'ฟาร์มคุณอำนาจ เจริญผล',
      address: 'อ.เมือง',
      province: 'ราชบุรี',
      tel: '(089)2541193',
      month: 'เมษายน',
      year: '2560',
      data: ['-', '-', 60.00]
    },
    {
      farmName: 'ศิริปุณย์ฟาร์ม',
      address: 'อ.เมือง',
      province: 'ฉะเชิงเทรา',
      tel: '(038)541429-30',
      month: 'เมษายน',
      year: '2560',
      data: ['-', '-', 60.00]
    },
    {
      farmName: 'ฟาร์มโชคชัยการสุกร',
      address: 'อ.โชคชัย',
      province: 'นครราชสีมา',
      tel: '(044)212442',
      month: 'เมษายน',
      year: '2560',
      data: ['-', '-', 58.00]
    }
  ];
  const result = changeDataTableToArray(mockhtml);
  expect(result).toHaveLength(4);
  expect(result).toEqual(expectedAns);
});

test('nameToID should change text to number', () => {
  const ans = nameToID('มณฑล');
  expect(ans).toEqual(14442);
});
