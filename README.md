# DA_HTTT
 Đồ án đa ngành_hệ thống thông tin của nhóm 12 


Docker compose:
    when restart || change:
        docker-compose down 
    build:
        docker-compose up --build -d