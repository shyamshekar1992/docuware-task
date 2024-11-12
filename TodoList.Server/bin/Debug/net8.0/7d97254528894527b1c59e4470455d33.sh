function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 82467;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 82467 > /dev/null;
done;

for child in $(list_child_processes 82468);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/shyamshekar/Downloads/TodoList 2/TodoList.Server/bin/Debug/net8.0/7d97254528894527b1c59e4470455d33.sh;
