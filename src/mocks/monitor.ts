import { Monitor } from '@/service';
import { http, HttpResponse } from 'msw';

export const monitor = [
  http.get(`/api${Monitor.Api.INFO}`, () => {
    return HttpResponse.json({
      code: 200,
      msg: '操作成功',
      data: {
        hostname: 'gaoyangdeMacBook-Pro.local',
        ipAddress: '127.0.0.1',
        osName: 'Mac OS X',
        osVersion: '15.1',
        cpuModel: 'aarch64 15.1',
        cpuCores: 8,
        totalMemory: 16384,
        freeMemory: 88,
        usedMemory: 16295,
        memoryUsage: 0.9946,
        availableMemory: 0,
        upTime: 0,
        javaVersion: '17.0.7',
        javaHome:
          '/Users/gaoyang/Tools/jdk/zulu17.42.19-ca-jdk17.0.7-macosx_aarch64/zulu-17.jdk/Contents/Home',
        javaVendor: 'Azul Systems, Inc.',
        osArch: 'aarch64',
        osFamily: null,
        osManufacturer: null,
        osTimezone: null,
        osLanguage: null,
        osVariant: null,
        osServicePack: null,
        osSerialNumber: null,
        osBuildNumber: null,
        osCodeName: 'Mac OS X',
        cpuUsage: 0.6523,
        javaFreeMemory: 55,
        javaMaxMemory: 4096,
        javaTotalMemory: 178,
        javaUsedMemory: 123,
        javaMemoryUsage: 0.691,
        diskTotalSpace: 460,
        diskUsableSpace: 47,
        diskFreeSpace: 0,
        diskReadBytes: 0,
        diskWriteBytes: 0,
        diskUsage: 0.8978,
        diskUsedSpace: 413,
      },
      timestamp: 1736305856880,
      success: true,
      requestId: 'cbeb7dbc05e44c53b0675a5f9b8f1791',
    });
  }),

  http.get(`/api${Monitor.Api.NETWORK}`, () => {
    return HttpResponse.json({
      code: 200,
      msg: '操作成功',
      data: {
        queue: [
          {
            time: '11:13:27',
            upFlow: 12.7,
            downFlow: 28.32,
          },
          {
            time: '11:13:30',
            upFlow: 7.81,
            downFlow: 16.6,
          },
          {
            time: '11:13:30',
            upFlow: 7.81,
            downFlow: 16.6,
          },
          {
            time: '11:13:33',
            upFlow: 91.8,
            downFlow: 99.61,
          },
          {
            time: '11:13:33',
            upFlow: 91.8,
            downFlow: 99.61,
          },
          {
            time: '11:13:36',
            upFlow: 4.88,
            downFlow: 7.81,
          },
          {
            time: '11:13:36',
            upFlow: 4.88,
            downFlow: 7.81,
          },
          {
            time: '11:13:39',
            upFlow: 37.11,
            downFlow: 37.11,
          },
          {
            time: '11:13:39',
            upFlow: 37.11,
            downFlow: 37.11,
          },
          {
            time: '11:13:42',
            upFlow: 0.0,
            downFlow: 7.81,
          },
          {
            time: '11:13:42',
            upFlow: 0.0,
            downFlow: 7.81,
          },
          {
            time: '11:13:45',
            upFlow: 31.25,
            downFlow: 20.51,
          },
          {
            time: '11:13:45',
            upFlow: 31.25,
            downFlow: 20.51,
          },
          {
            time: '11:13:48',
            upFlow: 4.88,
            downFlow: 7.81,
          },
          {
            time: '11:13:48',
            upFlow: 4.88,
            downFlow: 7.81,
          },
        ],
      },
      timestamp: 1736306028352,
      success: true,
      requestId: 'fc3cb3b024a64e219c25a4c07b294361',
    });
  }),
];
