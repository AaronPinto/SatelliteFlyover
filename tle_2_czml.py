import tle2czml
from datetime import datetime, timedelta, timezone

# Creates a file in the current directory called "orbit.czml", containing the orbits of the satelites over the next 24 hours.
# tle2czml.create_czml("tle.txt")

# You can specify the time range you would like to visualise
# Year, Month, Day, Hour, Minute
start_time = orig_start_time = datetime(2019, 4, 21, 0, 0, tzinfo=timezone.utc)
end_time = datetime(2019, 5, 6, 0, 0, tzinfo=timezone.utc)
dayDelta = (end_time - start_time).days
timeSeq = [start_time]

for i in range(dayDelta):
	start_time = start_time + timedelta(days=1)
	timeSeq.append(start_time)

if end_time - timeSeq[-1] != timedelta(0):
	timeSeq.append(end_time)

tle2czml.create_czml("tle.txt", start_time=orig_start_time, end_time=end_time, time_list=timeSeq)

# You can also specify a different output path
# tle2czml.create_czml(input_file, outputfile_path="k3a_orbit.czml")
