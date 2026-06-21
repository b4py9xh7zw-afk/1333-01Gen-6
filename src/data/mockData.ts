import type { UserInfo, Notice, BorrowRecord, ReserveRecord } from '../types';

export const mockUsers: Record<string, UserInfo> = {
  'LIB2024001': {
    id: 'U001',
    name: '张博文',
    userType: 'adult',
    libraryCardNo: 'LIB2024001',
    phone: '13812345678',
    campusId: 'STU20210001',
  },
  'LIB2024002': {
    id: 'U002',
    name: '李小乐',
    userType: 'child',
    libraryCardNo: 'LIB2024002',
    phone: '13987654321',
    parentPhone: '13811112222',
  },
  '13812345678': {
    id: 'U001',
    name: '张博文',
    userType: 'adult',
    libraryCardNo: 'LIB2024001',
    phone: '13812345678',
    campusId: 'STU20210001',
  },
  '13987654321': {
    id: 'U002',
    name: '李小乐',
    userType: 'child',
    libraryCardNo: 'LIB2024002',
    phone: '13987654321',
    parentPhone: '13811112222',
  },
  'STU20210001': {
    id: 'U001',
    name: '张博文',
    userType: 'adult',
    libraryCardNo: 'LIB2024001',
    phone: '13812345678',
    campusId: 'STU20210001',
  },
};

export const mockNotices: Notice[] = [
  {
    id: 'N001',
    title: '端午假期闭馆通知',
    content: '6月22日（周日）至6月24日（周二）闭馆，6月25日正常开放，假期期间24小时自助借还区正常使用',
    date: '2026-06-15',
    type: 'closure',
  },
  {
    id: 'N002',
    title: '古籍修复体验活动招募',
    content: '6月28日举办「指尖上的文物」古籍修复体验活动，限30人，亲子家庭优先报名',
    date: '2026-06-18',
    type: 'event',
  },
  {
    id: 'N003',
    title: '夏季借阅期限调整通知',
    content: '暑期（7月1日-8月31日）借阅期限自动延长至60天，无需手动续借',
    date: '2026-06-20',
    type: 'info',
  },
  {
    id: 'N004',
    title: '少儿绘本区改造升级',
    content: '6月25日起少儿绘本区临时搬迁至三楼305室，预计7月10日重新开放',
    date: '2026-06-19',
    type: 'info',
  },
];

export const mockBorrowRecords: BorrowRecord[] = [
  {
    id: 'B001',
    bookTitle: '百年孤独',
    dueDate: '2026-06-28',
    canRenew: true,
    coverColor: 'from-amber-500 to-orange-600',
  },
  {
    id: 'B002',
    bookTitle: '人类简史',
    dueDate: '2026-06-25',
    canRenew: true,
    coverColor: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'B003',
    bookTitle: '活着',
    dueDate: '2026-07-02',
    canRenew: true,
    coverColor: 'from-rose-500 to-red-600',
  },
];

export const mockReserveRecords: ReserveRecord[] = [
  {
    id: 'R001',
    bookTitle: '三体全集',
    status: 'available',
    reserveDate: '2026-06-19',
    coverColor: 'from-sky-500 to-blue-600',
  },
  {
    id: 'R002',
    bookTitle: '红楼梦脂评本',
    status: 'pending',
    reserveDate: '2026-06-20',
    coverColor: 'from-violet-500 to-purple-600',
  },
];

export const demoCredentials = [
  {
    label: '成人读者（借阅证）',
    method: 'libraryCard',
    card: 'LIB2024001',
    password: '123456',
  },
  {
    label: '儿童读者（借阅证）',
    method: 'libraryCard',
    card: 'LIB2024002',
    password: '123456',
  },
  {
    label: '手机号登录',
    method: 'phone',
    phone: '13812345678',
    code: '123456',
  },
  {
    label: '校园账号',
    method: 'campus',
    id: 'STU20210001',
    password: '123456',
  },
];
