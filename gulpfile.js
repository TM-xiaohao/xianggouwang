const gulp = require("gulp"),	
	connect = require("gulp-connect"),
	sass = require("gulp-sass");

// ����������
gulp.task("connect", function(){
	connect.server({
		root : "dist", // webserver �ĸ�Ŀ¼
		livereload: true // ������Զ�ˢ��
	});
});

// ���� HTML �ļ��� dist Ŀ¼�£���HTMLҳ���޸ĺ��ܹ����¼���
gulp.task("html", function(){
	gulp.src("src/**/*.html")
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload()); // ������Զ�ˢ��
});

// ���� js �ļ��� dist Ŀ¼�£���js�޸ĺ��ܹ����¼���
gulp.task("js", function(){
	gulp.src("src/js/**/*.js")
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload()); // ������Զ�ˢ��
});

// ���� lib Ŀ¼�� dist ��
gulp.task("copy-lib", function(){
	gulp.src("src/lib/**/*.*")
		.pipe(gulp.dest("dist/lib"))
});
// ����ͼƬ�� dist ��
gulp.task("copy-img", function(){
	gulp.src("src/img/**/*.*")
		.pipe(gulp.dest("dist/img"))
});
// ���Ƽ����ݵ� dist ��
gulp.task("copy-mock", function(){
	gulp.src("src/mock/**/*.*")
		.pipe(gulp.dest("dist/mock"))
});
gulp.task("copy", ["copy-lib", "copy-img", "copy-mock"]);

// ���� *.scss �ļ�Ϊ *.css �ļ� 
gulp.task("sass", function(){
	gulp.src("src/sass/*.scss")
		.pipe(sass({outputStyle:"compressed"}))
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
});

// �����ļ����޸�
gulp.task("watch", function(){
	gulp.watch("src/sass/*.scss", ["sass"]);
	gulp.watch("src/**/*.html", ["html"]);
	gulp.watch("src/js/**/*.js", ["js"]);
});

// ����Ĭ�ϣ�ȱʡ������
gulp.task("default", ["html", "js", "sass", "copy", "connect", "watch"]);