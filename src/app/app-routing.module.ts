import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'first-time-login',
    loadChildren: () => import('./auth/first-time-login/first-time-login.module').then( m => m.FirstTimeLoginPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./auth/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./auth/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile-syarikat',
    loadChildren: () => import('./auth/profile-syarikat/profile-syarikat.module').then( m => m.ProfileSyarikatPageModule)
  },
  {
    path: 'profile-perniagaan',
    loadChildren: () => import('./auth/profile-perniagaan/profile-perniagaan.module').then( m => m.ProfilePerniagaanPageModule)
  },
  {
    path: 'profile-pekebun',
    loadChildren: () => import('./auth/profile-pekebun/profile-pekebun.module').then( m => m.ProfilePekebunPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./core/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'insentif',
    loadChildren: () => import('./core/insentif/insentif.module').then( m => m.InsentifPageModule)
  },
  {
    path: 'aliran-tunai',
    loadChildren: () => import('./core/aliran-tunai/aliran-tunai.module').then( m => m.AliranTunaiPageModule)
  },
  {
    path: 'tambah-tunai-masuk',
    loadChildren: () => import('./core/modal/tambah-tunai-masuk/tambah-tunai-masuk.module').then( m => m.TambahTunaiMasukPageModule)
  },
  {
    path: 'tambah-tunai-keluar',
    loadChildren: () => import('./core/modal/tambah-tunai-keluar/tambah-tunai-keluar.module').then( m => m.TambahTunaiKeluarPageModule)
  },
  {
    path: 'kemaskini-tunai-masuk',
    loadChildren: () => import('./core/modal/kemaskini-tunai-masuk/kemaskini-tunai-masuk.module').then( m => m.KemaskiniTunaiMasukPageModule)
  },
  {
    path: 'kemaskini-tunai-keluar',
    loadChildren: () => import('./core/modal/kemaskini-tunai-keluar/kemaskini-tunai-keluar.module').then( m => m.KemaskiniTunaiKeluarPageModule)
  },
  {
    path: 'buku-tunai',
    loadChildren: () => import('./core/buku-tunai/buku-tunai.module').then( m => m.BukuTunaiPageModule)
  },
  {
    path: 'ringkasan-lejar',
    loadChildren: () => import('./core/ringkasan-lejar/ringkasan-lejar.module').then( m => m.RingkasanLejarPageModule)
  },
  {
    path: 'pnl',
    loadChildren: () => import('./core/pnl/pnl.module').then( m => m.PnlPageModule)
  },
  {
    path: 'katalog',
    loadChildren: () => import('./core/katalog/katalog/katalog.module').then( m => m.KatalogPageModule)
  },
  {
    path: 'tambah-katalog',
    loadChildren: () => import('./core/katalog/tambah-katalog/tambah-katalog.module').then( m => m.TambahKatalogPageModule)
  },
  {
    path: 'kemaskini-katalog',
    loadChildren: () => import('./core/katalog/kemaskini-katalog/kemaskini-katalog.module').then( m => m.KemaskiniKatalogPageModule)
  },
  {
    path: 'katalog-pegawai',
    loadChildren: () => import('./core/katalog/katalog-pegawai/katalog-pegawai.module').then( m => m.KatalogPegawaiPageModule)
  },
  {
    path: 'maklumat-produk',
    loadChildren: () => import('./core/katalog/maklumat-produk/maklumat-produk.module').then( m => m.MaklumatProdukPageModule)
  },
  {
    path: 'jana-dokumen',
    loadChildren: () => import('./core/jana-dokumen/jana-dokumen/jana-dokumen.module').then( m => m.JanaDokumenPageModule)
  },
  {
    path: 'tambah-jana-dokumen',
    loadChildren: () => import('./core/jana-dokumen/tambah-jana-dokumen/tambah-jana-dokumen.module').then( m => m.TambahJanaDokumenPageModule)
  },
  {
    path: 'kemaskini-dokumen',
    loadChildren: () => import('./core/jana-dokumen/kemaskini-dokumen/kemaskini-dokumen.module').then( m => m.KemaskiniDokumenPageModule)
  },
  {
    path: 'buletin',
    loadChildren: () => import('./core/buletin/buletin/buletin.module').then( m => m.BuletinPageModule)
  },
  {
    path: 'tambah-buletin',
    loadChildren: () => import('./core/buletin/tambah-buletin/tambah-buletin.module').then( m => m.TambahBuletinPageModule)
  },
  {
    path: 'kemaskini-buletin',
    loadChildren: () => import('./core/buletin/kemaskini-buletin/kemaskini-buletin.module').then( m => m.KemaskiniBuletinPageModule)
  },
  {
    path: 'lawatan-pegawai',
    loadChildren: () => import('./core/lawatan/lawatan-pegawai/lawatan-pegawai.module').then( m => m.LawatanPegawaiPageModule)
  },
  {
    path: 'tarikh-lawatan-pgw',
    loadChildren: () => import('./core/lawatan/tarikh-lawatan-pgw/tarikh-lawatan-pgw.module').then( m => m.TarikhLawatanPgwPageModule)
  },
  {
    path: 'pengesahan-tarikh-lawatan-pgw',
    loadChildren: () => import('./core/lawatan/pengesahan-tarikh-lawatan-pgw/pengesahan-tarikh-lawatan-pgw.module').then( m => m.PengesahanTarikhLawatanPgwPageModule)
  },
  {
    path: 'tambah-laporan',
    loadChildren: () => import('./core/lawatan/tambah-laporan/tambah-laporan.module').then( m => m.TambahLaporanPageModule)
  },
  {
    path: 'lawatan-usahawan',
    loadChildren: () => import('./core/lawatan/lawatan-usahawan/lawatan-usahawan.module').then( m => m.LawatanUsahawanPageModule)
  },
  {
    path: 'notifikasi',
    loadChildren: () => import('./core/notifikasi/notifikasi.module').then( m => m.NotifikasiPageModule)
  },
  {
    path: 'senarai-laporan-pegawai',
    loadChildren: () => import('./core/lawatan/senarai-laporan-pegawai/senarai-laporan-pegawai.module').then( m => m.SenaraiLaporanPegawaiPageModule)
  },
  {
    path: 'kemaskini-laporan',
    loadChildren: () => import('./core/lawatan/kemaskini-laporan/kemaskini-laporan.module').then( m => m.KemaskiniLaporanPageModule)
  },
  {
    path: 'carian',
    loadChildren: () => import('./core/carian/carian.module').then( m => m.CarianPageModule)
  },
  {
    path: 'tooltip',
    loadChildren: () => import('./core/jana-dokumen/tooltip/tooltip.module').then( m => m.TooltipPageModule)
  },
  {
    path: 'carian-usahawan',
    loadChildren: () => import('./core/lawatan/carian-usahawan/carian-usahawan.module').then( m => m.CarianUsahawanPageModule)
  },
  {
    path: 'carian-usahawan-tarikh-lawatan',
    loadChildren: () => import('./lawatan/carian-usahawan-tarikh-lawatan/carian-usahawan-tarikh-lawatan.module').then( m => m.CarianUsahawanTarikhLawatanPageModule)
  },
  {
    path: 'carian-usahawan-tarikh-lawatan',
    loadChildren: () => import('./core/lawatan/carian-usahawan-tarikh-lawatan/carian-usahawan-tarikh-lawatan.module').then( m => m.CarianUsahawanTarikhLawatanPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
